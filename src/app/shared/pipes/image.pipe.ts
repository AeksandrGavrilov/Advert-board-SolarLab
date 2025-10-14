import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  public readonly PLACEHOLDERS = '/assets/images/ImageHolderForAdvertDetails.png';

  transform(value: string | null | undefined ): string {
    return value || this.PLACEHOLDERS;
  }
  
}
