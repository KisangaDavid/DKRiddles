#include "puzzleUtils.h"
#include <vector>
// #include <cstdint>

struct Position {
  int row;
  int col;
};

class Node {
  private:
    static inline int sIdGen {-2}; // first 2 ids generated are start and end node

  public:
    int id {};
    std::vector<Node*> adjacentNodes {};
    bool isDeleted {false};
    Node* prevNode = nullptr;

    Node() : id {sIdGen++} {}      

    Node(const Node& otherNode) 
      : id {otherNode.id}, adjacentNodes {otherNode.adjacentNodes}, prevNode {otherNode.prevNode} {
    }

    static void setIdGen(int id) {
      sIdGen = id;
    }

    Node& operator=(const Node& node) = delete;
};

class HouseRatRiddle {
  public:
    HouseRatRiddle(int numDeletedNodes, int numHouses, int guessesPerDay) 
      : m_numHouses {numHouses}, m_guessesPerDay {guessesPerDay}, m_numDays {numDeletedNodes / 2}
      {
        nodes.resize(static_cast<std::size_t>(numHouses * m_numDays));
        buildGraph();
      }

    std::vector<uint32_t> solve(std::vector<int> deletedNodeIds) {
        for(int id : deletedNodeIds) {
          nodes[static_cast<std::size_t>(id)].isDeleted = true;
        }
      return findPath();
    }

    std::vector<uint32_t> findPath() {
      std::vector<uint32_t> path {};
      if (dfs(&startNode)) {
        Node* curNode = endNode.prevNode;
        while(curNode->id != startNode.id) {
          path.push_back(static_cast<uint32_t>(getPosition(*curNode).col));
          curNode = curNode->prevNode;
        }
      }
      return path;
    }

  private:
    std::vector<Node> nodes {};
    Node startNode {};
    Node endNode {};
    const int m_numHouses {};
    const int m_guessesPerDay {};
    const int m_numDays {};

    bool dfs(Node* curNode) {
      if (curNode->id == endNode.id) {
        return true;
      }
      curNode->isDeleted = true;
      for(Node* adjacentNode : curNode->adjacentNodes) {
        if(!adjacentNode->isDeleted) {
          adjacentNode->prevNode = curNode;
          if (dfs(adjacentNode)) {
            return true;
          }
        }
      }
      return false;
    }

    void buildGraph() {
      for (Node& node : nodes) {
        Position position = getPosition(node);
        if (position.row == 0) {
          startNode.adjacentNodes.push_back(&node);
        }
        if (position.col > 0 && position.row != 0) {
          nodes[getId(position.row - 1, position.col - 1)].adjacentNodes.push_back(&node);
        }
        if (position.col < m_numHouses - 1 && position.row != 0) {
          nodes[getId(position.row - 1, position.col + 1)].adjacentNodes.push_back(&node);
        }
        if (position.row == m_numDays - 1) {
          node.adjacentNodes.push_back(&endNode);
        }
      }
      Node::setIdGen(-2);
    }

    int optimalNumGuesses() {
      return m_guessesPerDay + 1;
    }
    
    Position getPosition(Node node) {
      return Position {node.id / m_numHouses, node.id % m_numHouses};
    }

    std::size_t getId(int row, int col) {
      return static_cast<std::size_t>(row * m_numHouses + col);
    }
};

[[clang::export_name("checkBonusAnswer")]]
uint32_t checkAnswer(uint32_t numBonusHouses, uint32_t bonusAnswer) {
  uint32_t daysToEliminateAlternating = numBonusHouses / 3;
  if (numBonusHouses % 3 == 0 && daysToEliminateAlternating % 2 == 0) {
    return 2 * daysToEliminateAlternating - 1 == bonusAnswer;
  }
  return 2 * daysToEliminateAlternating == bonusAnswer;
}


[[clang::export_name("checkRiddleAnswer")]]
uint32_t checkAnswer(uint64_t num1) {
  int position = 0;
  std::vector<int> deletedNodes {};
  while(num1 > 0) {
    if(num1 & 1) {
      deletedNodes.push_back(position);
    }
    num1 >>= 1;
    ++position;
  }

  HouseRatRiddle houseHatRiddle(static_cast<int>(deletedNodes.size()), 8, 2);
  std::vector<uint32_t> path = houseHatRiddle.solve(deletedNodes); 

  if(path.size() == 0) {
    return static_cast<uint32_t>(-1);
  }

  uint32_t toReturn {0};
  uint32_t mask {};
  for(std::size_t i=0; i < path.size(); i++) {
    mask = path[i] << (i * 3);
    toReturn |= mask;
  }
  return toReturn;
}

int main() {
}