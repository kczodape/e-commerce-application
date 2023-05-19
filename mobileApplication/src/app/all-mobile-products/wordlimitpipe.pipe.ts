import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordlimitpipe',
})
export class WordlimitpipePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value) {
      const words = value.split(' ');
      if (words.length > limit) {
        value = words.slice(0, limit).join(' ') + '...';
      }
    }
    return value;
  }
}
