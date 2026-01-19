import UIKit
import SafariServices

class ViewController: UIViewController {
    
    @IBOutlet weak var statusLabel: UILabel!
    @IBOutlet weak var enableButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        checkExtensionStatus()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        checkExtensionStatus()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor(red: 15/255, green: 23/255, blue: 42/255, alpha: 1.0)
        
        // Setup status label styling
        statusLabel?.textColor = .white
        statusLabel?.font = UIFont.systemFont(ofSize: 16, weight: .medium)
        
        // Setup button styling
        enableButton?.backgroundColor = UIColor(red: 59/255, green: 130/255, blue: 246/255, alpha: 1.0)
        enableButton?.setTitleColor(.white, for: .normal)
        enableButton?.layer.cornerRadius = 12
        enableButton?.titleLabel?.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
    }
    
    private func checkExtensionStatus() {
        SFSafariExtensionManager.getStateOfSafariExtension(
            withIdentifier: "com.pureguard.PureGuard.Extension"
        ) { [weak self] state, error in
            DispatchQueue.main.async {
                if let error = error {
                    self?.statusLabel?.text = "Error checking extension status"
                    print("Error: \(error.localizedDescription)")
                    return
                }
                
                if let state = state {
                    if state.isEnabled {
                        self?.statusLabel?.text = "✅ PureGuard is active and protecting you"
                        self?.enableButton?.setTitle("Open Safari Settings", for: .normal)
                    } else {
                        self?.statusLabel?.text = "⚠️ PureGuard needs to be enabled in Safari"
                        self?.enableButton?.setTitle("Enable in Safari Settings", for: .normal)
                    }
                }
            }
        }
    }
    
    @IBAction func openSafariSettings(_ sender: Any) {
        SFSafariApplication.showPreferencesForExtension(
            withIdentifier: "com.pureguard.PureGuard.Extension"
        ) { error in
            if let error = error {
                print("Error opening Safari preferences: \(error.localizedDescription)")
                // Fallback: open Safari settings URL
                if let url = URL(string: "App-Prefs:SAFARI") {
                    UIApplication.shared.open(url)
                }
            }
        }
    }
}
