# Random data generator
This node.js script generates random fake financial or exercise data, used to evaluate the performance of [PePSA](https://github.com/jessegeens/pepsa-component).

## Options
`tcx.js` generates TCX (Training Center XML) files, which represent exercise (sporting) sessions
`transactions.js` generates fake financial data, in JSON

## Usage
The first argument specifies how many transactions to generate.
The second argument specifies the path of the output file.

Example:
`node src/transactions.js 100 $(pwd)/output.json`