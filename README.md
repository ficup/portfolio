# Overview of the projects:
#
## Auto-generation of model:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The code utilises Tensorflow library and NSGA2 genetic algorhitm to automatically generate a sequential neural network, based on the input data. At the beggining, user can narrow down the number of possible models by setting some of the global variables such as MAX_LAYER_SIZE etc. After running the desired number of epochs, the program returns a set of optimal candidates, trying to balance the efficiency and size of the model - some are slower but give more accurate results while the others are light but less accurate. 
#
## Stock trend prediction:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The goal of this project is to predict the price of WIG for the next day, based on some historical prices. The code uses Tensorflow library. There are two jupyter notebooks, each solving the problem through different approach:

1) The first one uses a recurrent (LSTM) network that is fed with values of all WIG prices from the previous N days to predict the WIG price on the N+1th day. Because the course was too chaotic for this simple model, the data was first averaged and 5% of the outliers were removed. This way, model can predict results visibly similar to the validation data.
2) Each training sample consist of a certain number of USD, Pound and Euro prices as input values and WIG trend for the next day. The trend is not a price itself but a label representing how much the value has changed (big decrease, small decrease, small increas, big increase). Thanks to this approach, the model can return decent results without the need to average the input data, and can also be used without recurrent layers.
#
## Multilayer perceptron

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This is a set of C++ classes allowing to create a simple multilayer perceptron. It can be trained on numerical data and solve simple mathematical problems. There are two included examples presenting the possibilities of the program:

1) Model returns -1 or 1 depending whether the input value was less or more than 5.
2) Model returns value of sinus after receiving its argument.

Both examples are provided with a python script that plots model results in a certain number space.
