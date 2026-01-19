import SafariServices

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    func beginRequest(with context: NSExtensionContext) {
        let request = context.inputItems.first as? NSExtensionItem
        
        let profile: UUID?
        if #available(iOS 17.0, macOS 14.0, *) {
            profile = request?.userInfo?[SFExtensionProfileKey] as? UUID
        } else {
            profile = request?.userInfo?["profile"] as? UUID
        }
        
        let message: Any?
        if #available(iOS 15.0, macOS 11.0, *) {
            message = request?.userInfo?[SFExtensionMessageKey]
        } else {
            message = request?.userInfo?["message"]
        }
        
        os_log(.default, "PureGuard: Received message from browser.runtime.sendNativeMessage: %@", String(describing: message))
        
        let response = NSExtensionItem()
        
        // Handle messages from the extension
        if let messageDict = message as? [String: Any],
           let action = messageDict["action"] as? String {
            
            switch action {
            case "getDeviceInfo":
                // Return device information to the extension
                response.userInfo = [
                    SFExtensionMessageKey: [
                        "platform": "ios",
                        "version": UIDevice.current.systemVersion,
                        "model": UIDevice.current.model
                    ]
                ]
                
            case "log":
                // Log message from extension (for debugging)
                if let logMessage = messageDict["message"] as? String {
                    os_log(.default, "PureGuard Extension: %@", logMessage)
                }
                response.userInfo = [SFExtensionMessageKey: ["success": true]]
                
            default:
                // Echo back unhandled messages
                response.userInfo = [SFExtensionMessageKey: ["received": message as Any]]
            }
        } else {
            // Default response
            response.userInfo = [SFExtensionMessageKey: ["status": "ok"]]
        }
        
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }
}
