import { ITimetableHistory, TimeType } from '~/types/typedef';
import { daysName } from './constant';

/**
 * Get Table ColSpan base on startTime - endTime diff
 * -> 30min: 1 colSpan
 * @param startTime
 * @param endTime
 * @returns table colSpan base on time diff
 */
export function getColSpan(startTime: TimeType, endTime: TimeType): number {
   var startTimeToMin: number = startTime.hour * 60 + startTime.min;
   var endTimeToMin: number = endTime.hour * 60 + endTime.min;

   // invalid time
   if (startTimeToMin > endTimeToMin) {
      return 3;
   }

   var timeDiffToMin = endTimeToMin - startTimeToMin;

   let colSpan = 0;
   const halfHour: number = 30;

   while (timeDiffToMin >= halfHour) {
      timeDiffToMin -= halfHour;
      colSpan += 1;
   }

   return colSpan;
}

function isSameTime(startTime: TimeType, endTime: TimeType): boolean {
   return startTime.hour == endTime.hour && startTime.min == endTime.min;
}

/**
 * Creates Array that can fill all columns
 * @param data
 * @returns column
 */
export function fillColumn(data: Array<any>): Array<any> {
   if (data.length == 0) {
      return data;
   }

   let filterData: any[] = [];
   let startingTime: TimeType = { hour: 8, min: 0 };
   let endingTime: TimeType = { hour: 16, min: 0 };

   if (
      !isSameTime(startingTime, { hour: data[0].startTime.hours, min: data[0].startTime.minutes })
   ) {
      filterData.push({
         startTime: { hours: startingTime.hour, minutes: startingTime.min },
         endTime: { hours: data[0].startTime.hours, minutes: data[0].startTime.minutes },
         subject: null
      });
   }

   for (let i = 0; i < data.length; i += 1) {
      if (i > 0) {
         let acc = data[i - 1].endTime;
         let curr = data[i].startTime;
         if (
            !isSameTime(
               { hour: acc.hours, min: acc.minutes },
               { hour: curr.hours, min: curr.minutes }
            )
         ) {
            filterData.push({
               startTime: {
                  hours: data[i - 1].endTime.hours,
                  minutes: data[i - 1].endTime.minutes
               },
               endTime: { hours: data[i].startTime.hours, minutes: data[i].startTime.minutes },
               subject: null
            });
         }
      }

      filterData.push(data[i]);
   }

   if (
      !isSameTime(endingTime, {
         hour: filterData[filterData.length - 1].endTime.hours,
         min: filterData[filterData.length - 1].endTime.minutes
      })
   ) {
      filterData.push({
         startTime: {
            hours: filterData[filterData.length - 1].endTime.hours,
            minutes: filterData[filterData.length - 1].endTime.minutes
         },
         endTime: { hours: endingTime.hour, minutes: endingTime.min },
         subject: null
      });
   }

   return filterData;
}

/*
    Fills all days for free slot render
*/
export function fillMissingDays(data: any): any {
   daysName.forEach((day) => {
      if (data[day] == undefined) {
         data[day] = null;
      }
   });
   return data;
}

export function removeDuplicateTimetableHistory(arr: Array<ITimetableHistory>) {
   return arr.filter((currEle, idx) => {
      return (
         arr.slice(idx, history.length).filter((ele: ITimetableHistory) => {
            return (
               ele.payload.fall == currEle.payload.fall &&
               ele.payload.section == currEle.payload.section &&
               ele.payload.semester == currEle.payload.semester
            );
         }).length == 1
      );
   });
}
