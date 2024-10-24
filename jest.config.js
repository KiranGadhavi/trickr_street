// module.exports = {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.[jt]sx?$": "babel-jest",
//   },
//   moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
// };
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
