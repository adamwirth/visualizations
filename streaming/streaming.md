# streaming

I want to make an updating chart that adds (randomly generated) data in asynchronously, putting it into buckets it makes up. And then the problem to solve would be how it assigns data with older-than-now timestamps effectively, so it isn't just an array of data that appends to itself on fetch.

Later: scaling it to go really fast, to animate, and to use more data.