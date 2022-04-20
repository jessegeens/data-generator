# Random financial data generator
This node.js script generates random fake financial data, used to evaluate the performance of [PePSA](https://github.com/jessegeens/pepsa-component).

## Usage
The first argument specifies how many transactions to generate.
The second argument specifies the path of the output file.

Example:
`node src/index.js 100 $(pwd)/output.json`