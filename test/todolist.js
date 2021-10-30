/* eslint-disable no-undef */
const TodoList = artifacts.require('TodoList.sol');

require('chai').use(require('chai-as-promised')).should();

contract('TodoList', ([deployer]) => {
  let todoList;

  before(async () => {
    todoList = await TodoList.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = todoList.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe('functionality', async () => {
    it('must add a task to the list', async () => {
      // create a task
      const result = await todoList.addTask('A new task');

      //get tasks create event
      const event = result.logs[0].args;

      // assert event properties
      assert.equal(event.id.toNumber(), 0);
      assert.equal(event.content, 'A new task');
      assert.equal(event.completed, false);
    });

    it('must reject a creation of task without content', async () => {
      // create a task
      await todoList.addTask('').should.be.rejected;
      await todoList.addTask().should.be.rejected;
    });

    it('must add a second task to the list', async () => {
      // create a task
      const result = await todoList.addTask('A new task 2');

      //get tasks create event
      const event = result.logs[0].args;

      // assert event properties
      assert.equal(event.id.toNumber(), 1);
      assert.equal(event.content, 'A new task 2');
      assert.equal(event.completed, false);
    });

    it('must list tasks', async () => {
      const taskCount = await todoList.taskCount();
      let tasks = [];

      for (let i = 0; i < taskCount; i++) {
        tasks.push(await todoList.getTask(i));
      }

      assert.equal(tasks.length, 2);
    });

    it('must set task as completed', async () => {
      //set task as completed
      const result = await todoList.completeTask(1);

      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), 1);
      assert.equal(event.completed, true);
    });

    it('must delete a task', async () => {
      //delete task
      const result = await todoList.deleteTask(1);

      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), 1);

      const taskCount = await todoList.taskCount();

      assert.equal(taskCount, 1);
    });
  });
});
