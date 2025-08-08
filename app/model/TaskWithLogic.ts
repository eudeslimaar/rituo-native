import { Task } from './Task';

export type TaskWithLogic = Task & {
  shouldDisplayOn: (date: Date) => boolean;
};

export function createTaskWithLogic(task: Task): TaskWithLogic {
  return {
    ...task,
    shouldDisplayOn(date: Date) {
      const day = date.getDay();
      const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
      const isoDate = date.toISOString().split('T')[0];

      // 🟡 Bloqueia datas ANTES do startDate
      if (task.startDate && isoDate < task.startDate) return false;

      // 🟡 Bloqueia datas DEPOIS da validade (se for until)
      if (task.validity.type === 'until' && task.validity.date && isoDate > task.validity.date) {
        return false;
      }

      // ✅ Exibição por tipo de repetição
      if (task.repeat === 'Once') return task.startDate === isoDate;
      if (task.repeat === 'EveryDay') return true;
      if (task.repeat === 'Weekdays') return day >= 1 && day <= 5;
      if (task.repeat === 'Weekends') return day === 0 || day === 6;
      if (task.repeat === 'Custom' && task.customDays)
        return task.customDays.includes(weekday);

      return false;
    },
  };
}
