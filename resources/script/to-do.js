import $ from '../jquery.module.js';

export default class ToDo {
  constructor() {
    this.selectors = {
      $addNew: $('.to-do__btn'),
      $toDo: $('.to-do'),
      $toDoList: $('.to-do__list'),
      $newTask: $('.new-task'),
      $newTaskForm: $('.new-task__form'),
      $newTaskTextarea: $('.new-task__textarea'),
    };

    this.classNames = {
      show: 'show',
    }
  }

  eventsHandlers() {
    this.selectors.$addNew.on('click', this.openForm.bind(this));
    this.selectors.$newTaskForm.on('submit', (e) => {
      e.preventDefault()
      this.addToDo(e);
    });
  }
  
  openForm({ currentTarget }) {
    const $target = $(currentTarget);
    const $newTask = $target.closest(this.selectors.$toDo).find(this.selectors.$newTask);
    $newTask.addClass(this.classNames.show);
  }
  
  addToDo({ currentTarget }) {
    const $target = $(currentTarget).closest(this.selectors.$toDo).find(this.selectors.$toDoList);
    const $newTask = $target.closest(this.selectors.$toDo).find(this.selectors.$newTask);

    const value = this.selectors.$newTaskTextarea.val();
    const toDoStructure = `
      <li class="to-do__item" draggable="true">
        ${value}
        <date class="to-do__date">jun 1 2022</date>
      </li>
    `;
    
    $newTask.removeClass(this.classNames.show);
    this.selectors.$newTaskTextarea.val('');
    $target.prepend(toDoStructure);
    $target.prepend($newTask);
  }
}