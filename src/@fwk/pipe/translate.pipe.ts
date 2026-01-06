import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false 
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private i18nService: I18nService) {}

  transform(key: string, dictionaryName: string = 'fwk'): string {
    if (!key) {
      return '';
    }
    
    const specificDict = this.i18nService.getDictionary(dictionaryName);
    let translation = specificDict?.translate?.(key);
    
    if (!translation || translation === key) {
        const fwkDict = this.i18nService.getDictionary('fwk');
        translation = fwkDict?.translate?.(key);
    }

    return translation || key;
  }
}