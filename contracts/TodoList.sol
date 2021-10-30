// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.0;

import './Helpers.sol';

contract TodoList is Helpers {
  uint256 public taskCount = 0;

  struct Task {
    uint256 id;
    string content;
    bool completed;
  }

  mapping(uint256 => Task) public tasks;

  //Events
  event TaskCreated(uint256 id, string content, bool completed);
  event TaskCompleted(uint256 id, string content, bool completed);
  event TaskRemoved(uint256 id, string content, bool completed);

  //Local functions
  function _addTask(string memory _content) internal {
    require(emptyString(_content), 'string cannot be empty');

    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
    taskCount++;
  }

  function _getTask(uint256 _id) internal view returns (Task storage) {
    return tasks[_id];
  }

  function _completeTask(uint256 _id) internal {
    tasks[_id].completed = true;

    emit TaskCompleted(_id, tasks[_id].content, tasks[_id].completed);
  }

  function _deleteTask(uint256 _id) internal {
    delete tasks[_id];

    taskCount = taskCount - 1;
    
    emit TaskRemoved(_id, tasks[_id].content, tasks[_id].completed);
  }

  //public functions
  function addTask(string memory _content) public {
    _addTask(_content);
  }

  function getTask(uint256 _id)
    public
    view
    returns (
      uint256,
      string memory,
      bool
    )
  {
    return (tasks[_id].id, tasks[_id].content, tasks[_id].completed);
  }

  function completeTask(uint256 _id) public {
    _completeTask(_id);
  }

  function deleteTask(uint256 _id) public {
    _deleteTask(_id);
  }
}
