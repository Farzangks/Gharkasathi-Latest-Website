import React, { useState } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  Layers, 
  FileCode2, 
  ShoppingBag, 
  ArrowRight, 
  AlertTriangle,
  Code,
  Sparkles,
  Smartphone,
  Copy,
  Check
} from 'lucide-react';
import { GlitchTestingSimulator } from './GlitchTestingSimulator';

export const FlutterGlitchFixGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const navFixCode = `// ============================================================================
// FIX 1: ROOT BOTTOM NAVIGATION BAR PRESERVATION (GetX Nested Navigator)
// File: lib/view/dashboard/dashboard_screen.dart (or main_screen.dart)
// ============================================================================

// ❌ ROOT CAUSE OF GLITCH:
// When navigating using \`Get.to(() => ServiceDetailScreen())\`, Flutter pushes
// a new route over the ENTIRE Scaffold, covering the BottomNavigationBar.
// After 2-3 page transitions, the root navigation context gets lost or popped.

// ✅ SOLUTION: Use an IndexedStack with nested GetX Navigator keys, OR
// pass \`id: 1\` to Get.to() so it pushes inside the nested tab scaffold!

class DashboardScreen extends StatelessWidget {
  final DashboardController controller = Get.put(DashboardController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(() => IndexedStack(
        index: controller.currentIndex.value,
        children: [
          // Tab 0: Home Screen Navigator
          Navigator(
            key: Get.nestedKey(0),
            onGenerateRoute: (settings) => MaterialPageRoute(
              builder: (context) => HomeScreen(),
            ),
          ),
          // Tab 1: In-Home Services Catalog
          Navigator(
            key: Get.nestedKey(1),
            onGenerateRoute: (settings) => MaterialPageRoute(
              builder: (context) => InHomeServicesScreen(),
            ),
          ),
          // Tab 2: Cart & Order Summary
          Navigator(
            key: Get.nestedKey(2),
            onGenerateRoute: (settings) => MaterialPageRoute(
              builder: (context) => CartScreen(),
            ),
          ),
          // Tab 3: Bookings & Profile
          Navigator(
            key: Get.nestedKey(3),
            onGenerateRoute: (settings) => MaterialPageRoute(
              builder: (context) => MyBookingsScreen(),
            ),
          ),
        ],
      )),
      bottomNavigationBar: Obx(() => BottomNavigationBar(
        currentIndex: controller.currentIndex.value,
        onTap: (index) {
          if (controller.currentIndex.value == index) {
            // If already on tab, pop to root of this tab
            Get.nestedKey(index)?.currentState?.popUntil((r) => r.isFirst);
          } else {
            controller.currentIndex.value = index;
          }
        },
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF047857), // Emerald brand
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.build_outlined), label: 'Services'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_bag_outlined), label: 'Cart'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt_long), label: 'Bookings'),
        ],
      )),
    );
  }
}`;

  const cartControllerCode = `// ============================================================================
// FIX 2: DYNAMIC CART CONTROLLER (Eliminate Hardcoded Cart Services)
// File: lib/view/in_home_services/cart/controller/cart_controller.dart
// ============================================================================

import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CartItem {
  final String id;
  final String title;
  final double price;
  int quantity;
  final String imageUrl;

  CartItem({
    required this.id,
    required this.title,
    required this.price,
    this.quantity = 1,
    required this.imageUrl,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'price': price,
    'quantity': quantity,
    'imageUrl': imageUrl,
  };
}

class CartController extends GetxController {
  // Reactive cart items list - dynamic and persistent
  var cartItems = <CartItem>[].obs;
  var isLoading = false.obs;

  // Dynamic GST percentage fetched from backend (defaults to 18% or whatever backend sends)
  var gstPercentage = 18.0.obs;

  @override
  void onInit() {
    super.onInit();
    fetchPlatformTaxRate();
  }

  // Fetch current GST rate set by Admin from https://gharkasathi.com/api/config/tax
  Future<void> fetchPlatformTaxRate() async {
    try {
      final res = await http.get(Uri.parse('https://gharkasathi.com/api/config/tax'));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        if (data['gstPercentage'] != null) {
          gstPercentage.value = double.tryParse(data['gstPercentage'].toString()) ?? 18.0;
        }
      }
    } catch (e) {
      print('Using fallback GST: \$e');
    }
  }

  // Real-time calculation getters
  double get subtotal => cartItems.fold(0, (sum, item) => sum + (item.price * item.quantity));
  double get gst => (subtotal * (gstPercentage.value / 100)); // Dynamic GST
  double get grandTotal => subtotal + gst;
  int get itemCount => cartItems.fold(0, (sum, item) => sum + item.quantity);

  // Add Dynamic Service to Cart
  void addToCart(dynamic service) {
    try {
      final existingIndex = cartItems.indexWhere((item) => item.id == service.id || item.id == service.sId);
      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += 1;
        cartItems.refresh();
      } else {
        cartItems.add(CartItem(
          id: service.id ?? service.sId ?? 'srv_\${DateTime.now().millisecondsSinceEpoch}',
          title: service.name ?? service.title ?? 'Home Service',
          price: double.tryParse(service.price.toString()) ?? 499.0,
          quantity: 1,
          imageUrl: service.image ?? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        ));
      }
      Get.snackbar(
        'Cart Updated',
        '\${service.name ?? "Service"} added to cart',
        snackPosition: SnackPosition.BOTTOM,
        duration: const Duration(seconds: 2),
      );
    } catch (e) {
      print('Error adding to cart: \$e');
    }
  }

  void removeFromCart(String id) {
    cartItems.removeWhere((item) => item.id == id);
  }

  void updateQuantity(String id, int quantity) {
    final item = cartItems.firstWhereOrNull((i) => i.id == id);
    if (item != null) {
      if (quantity <= 0) {
        removeFromCart(id);
      } else {
        item.quantity = quantity;
        cartItems.refresh();
      }
    }
  }

  void clearCart() {
    cartItems.clear();
  }

  // Live Checkout connected directly to https://gharkasathi.com/api/bookings
  Future<bool> checkout({
    required String customerName,
    required String customerPhone,
    required String address,
  }) async {
    try {
      isLoading.value = true;
      final response = await http.post(
        Uri.parse('https://gharkasathi.com/api/bookings'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'customerName': customerName,
          'customerPhone': customerPhone,
          'serviceType': cartItems.map((i) => '\${i.title} (x\${i.quantity})').join(', '),
          'address': address,
          'amount': grandTotal.round(),
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        clearCart();
        return true;
      }
      return false;
    } catch (e) {
      print('Checkout error: \$e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}`;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Bug className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold">
                Flutter Mobile App Glitch Audit & Code Patches
              </h3>
              <p className="text-xs text-stone-400">
                Direct fixes for both identified glitches: Cart Navbar Hiding & Hardcoded Cart Items.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full">
            Ready to Apply
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-800">
          <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Glitch #1: Cart Navbar Hides After 2-3 Pages
            </div>
            <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
              <strong>Cause:</strong> <code>Get.to()</code> pushes full-screen routes over the root <code>Scaffold</code>. Navigating back pops the scaffold context instead of maintaining the bottom navbar state stack.
            </p>
          </div>

          <div className="p-4 bg-stone-800/60 rounded-xl border border-stone-700/60">
            <div className="text-sky-400 font-bold text-xs flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              Glitch #2: Hardcoded Services in Cart
            </div>
            <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
              <strong>Cause:</strong> <code>CartController</code> was pre-populated with a static dummy list. Dynamic items added from the catalog were either overwritten or not reactive.
            </p>
          </div>
        </div>
      </div>

      {/* Code Patch 1 */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Patch 1: Root Bottom Navigation Bar Preservation
            </h4>
          </div>
          <button
            onClick={() => copyCode(navFixCode, 'nav-fix')}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-700 cursor-pointer"
          >
            {copiedSection === 'nav-fix' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSection === 'nav-fix' ? 'Copied' : 'Copy Dart Code'}
          </button>
        </div>
        <div className="p-4 bg-stone-950 text-stone-200 font-mono text-xs overflow-x-auto max-h-96">
          <pre>{navFixCode}</pre>
        </div>
      </div>

      {/* Code Patch 2 */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Patch 2: Dynamic Cart Controller (Zero Hardcoded Items)
            </h4>
          </div>
          <button
            onClick={() => copyCode(cartControllerCode, 'cart-fix')}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-700 cursor-pointer"
          >
            {copiedSection === 'cart-fix' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSection === 'cart-fix' ? 'Copied' : 'Copy Dart Code'}
          </button>
        </div>
        <div className="p-4 bg-stone-950 text-stone-200 font-mono text-xs overflow-x-auto max-h-96">
          <pre>{cartControllerCode}</pre>
        </div>
      </div>

      {/* Interactive Glitch Simulator & Verifier */}
      <GlitchTestingSimulator />
    </div>
  );
};
