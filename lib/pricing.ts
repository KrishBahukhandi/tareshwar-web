export function formatCoursePrice(price: number) {
  return price <= 0 ? "Free" : `₹${price.toLocaleString("en-IN")}`;
}
