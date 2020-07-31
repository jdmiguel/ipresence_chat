import data from '../db.json';
import { IMessage } from './types';

export const totalMessages = data.length;

// dates
const months = [
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' }
];
const factorDate = 8;

// app initial constants
export const initialAppClasses = ['app'];
export enum initialShowedMessageCounter {
  STARTER = 0,
  MAX_SHOWED = 20,
};
export const factorScroll = 1.1;

export const getUnreadMessagesCounter = () => data.reduce((acc:number = 0, next:IMessage) => {
  if(next.direction === 'in' && next.status === 'received') {
    acc++;
  }
  return acc;
},0); 

export const observerOptions = {
  root: document.querySelector('main'),
  rootMargin: '0px',
  threshold: 1.0
}

const getClassesMessage = (type: string) =>
  `message ${type === 'in' ? 'incoming' : ''}`;

const getIsUnread = (type: string, status: string) =>
  !!(type === 'in' && status === 'received');  

const getIconClassesMessage = (type: string, status: string) =>
  type === 'out' ? `material-icons ${status === 'read' ? 'read' : ''}` : '';

const getIconNameMessage = (type: string, status: string) =>
  type === 'out' ? (status === 'sent' ? 'done' : 'done_all') : '';

const getTimeMessage = (id: number, timeStamp: string) => {
  const currentDate = Date.now();
  const selectedDate = new Date(currentDate - (parseInt(timeStamp) / id * factorDate));

  const hour = selectedDate.getHours() < 10 ? `0${selectedDate.getHours()}` : selectedDate.getHours();
  const minutes = selectedDate.getMinutes();
  const month = months.find(month => selectedDate.getMonth() === month.value)?.text;
  const day = selectedDate.getDate();
  const year = selectedDate.getFullYear();

  return `${hour}:${minutes} - ${month} ${day}, ${year}`;
};

export const getShowedMessages = (formattingFunction:any) => (start: number, end: number) => {
  const messages = data.slice(start, end);
  return formattingFunction(messages);
}

export const getFormattedMessages = (messages:IMessage[]) => 
  messages.map((message) => ({
    id: message.id,
    text: message.text,
    isUnread: getIsUnread(message.direction, message.status),
    messageClasses: getClassesMessage(message.direction).trimEnd(),
    hasIcon: message.direction === 'out',
    iconClasses: getIconClassesMessage(message.direction, message.status).trimEnd(),
    iconName: getIconNameMessage(message.direction,message.status),
    date: getTimeMessage(message.id, message.timestamp)
  })
);

