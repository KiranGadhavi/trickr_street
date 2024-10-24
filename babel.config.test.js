// module.exports = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         targets: { node: "current" },
//         modules: "auto",
//       },
//     ],
//     [
//       "@babel/preset-react",
//       {
//         runtime: "automatic",
//       },
//     ],
//   ],
//   plugins: [["@babel/plugin-transform-runtime"], ["@babel/plugin-syntax-jsx"]],
// };
// module.exports = {
//   presets: [
//     ["@babel/preset-env", { targets: { node: "current" } }],
//     ["@babel/preset-react", { runtime: "automatic" }],
//   ],
//   plugins: ["@babel/plugin-transform-runtime"],
// };
// module.exports = {
//   presets: [
//     process.env.NODE_ENV === "test"
//       ? ["@babel/preset-env", { targets: { node: "current" } }]
//       : ["next/babel"],
//     ["@babel/preset-react", { runtime: "automatic" }],
//   ],
// };
