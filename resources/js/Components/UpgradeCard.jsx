export default function UpgradeCard() {
  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl p-6 text-white sticky top-24">
      <h3 className="text-lg font-bold mb-2">Upgrade to PRO</h3>
      <p className="text-sm text-purple-100 mb-6">
        Get access to all features and unlock unlimited possibilities!
      </p>
      
      <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-50 transition-colors mb-4">
        Get Pro Now!
      </button>

      <div className="space-y-3 pt-4 border-t border-purple-400/30">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">✓</span>
          <span>All features included</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">✓</span>
          <span>Priority support</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">✓</span>
          <span>Advanced analytics</span>
        </div>
      </div>
    </div>
  );
}