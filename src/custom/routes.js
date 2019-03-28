/**
 * @see https://www.npmjs.com/package/next-routes
 * @param {Object} routes The next-routes `routes` object.
 * @returns {undefined}
 */
function defineRoutes(routes) {
  routes
    .add("home", "/", "productGrid")
    .add("login", "/login", "login")
    .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
    .add("product", "/product/:slugOrId/:variantId?", "product")
    .add("shop", "/shop/:shopId/:tag", "productGrid")
    .add("tag", "/tag/:slug", "tag")

    // CabinetOne Customize Routes
    .add("search", "/search", "search")
    .add("kitchenDesign", "/kitchendesign", "kitchenDesign")
    
    // Account and profile
    .add("account", "/account", "account")
    .add("wishlist", "/account/wishlist", "wishlist")
    .add("orders", "/account/orders", "orders")
    .add("profile", "/account/profile", "profile")
    .add("paymentMethods", "/account/payment", "paymentMethods")
    // .add("profileAddressBook", "/profile/address", "profile")
    // .add("profileOrders", "/profile/orders", "profile")
    // .add("profilePaymentMethods", "/profile/payments", "profile")

    // Extras about
    .add("about", "/about", "about")
    .add("categories", "/categories", "categories")
    
    // Category verticals
    .add("samples", "/categories/samples", "samples")
    .add("category-kitchen", "/category/kitchen", "category-kitchen")
    .add("category-bedroom", "/category/bedroom", "category-bedroom")
    .add("category-bathroom", "/category/bathroom", "category-bathroom")
    .add("category-living", "/category/living", "category-living")
    .add("category-outdoor", "/category/living", "category-outdoor")

    // Product detail
    .add("product-samples", "/samples/:variantId?", "product-samples")

    // Checkout and payments
    .add("cart", "/cart", "cart")
    .add("checkout", "/cart/checkout", "checkout")
    .add("checkoutLogin", "/cart/login", "checkout")
    .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")

}

module.exports = defineRoutes;
