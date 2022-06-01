import $ from '../jquery.module.js';
import Pomodoro from './pomodoro.js';
import ToDo from './to-do.js';

const pomodoro = new Pomodoro();
pomodoro.eventsHandlers();

const toDo = new ToDo();
toDo.eventsHandlers();
