#define LEARNING_RATE 0.001
#define WEIGHT_UPPER_LIMIT 100.0
#define WEIGHT_LOWER_LIMIT -100.0
#define BIAS_UPPER_LIMIT 100.0
#define BIAS_LOWER_LIMIT -100.0

class Node;
class Connection{ 

    public:
    Node* from_node;
    Node* to_node;
    float weight;
    float bias;

    Connection(Node* from_node, Node* to_node); 
    Connection(Node* from_node, Node* to_node, float weight, float bias);
    void updateWeightAndBias();
};