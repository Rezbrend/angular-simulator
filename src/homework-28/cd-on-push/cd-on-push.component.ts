import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-cd-on-push',
  imports: [],
  templateUrl: './cd-on-push.component.html',
  styleUrl: './cd-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdOnPushComponent implements DoCheck {
  
  count: number = 0;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngDoCheck(): void {
    console.warn('Change Detection cycle triggered');
  };

  changeCount(): void {
    this.count++;
    this.cdr.markForCheck();
  };
  
// 1. Что произошло после вызова markForCheck()?
// Angular знает, что данные изменились, но не запускает CD прямо сейчас.

// 2. Обновился ли интерфейс сразу?
// Нет. DOM не обновляется синхронно в этой строке.

// 3. Когда фактически произошел Change Detection?
//  В следующем цикле обнаружения изменений.

// 4. Почему без markForCheck() интерфейс не обновлялся?
// При стратегии OnPush Angular пропускает компонент, если не изменились входные свойства (@Input) и не было событий DOM.
  
  changeCountWithDetectChanges(): void {
    this.count++;
    this.cdr.detectChanges();
  };
  
// 1. Чем поведение отличается от предыдущего сценария (markForCheck)?
// detectChanges() запускает обнаружение изменений немедленно и синхронно для этого компонента и его дочерних элементов.
// markForCheck() помечает только компонент и предков, но не запускает процесс прямо сейчас.

// 2. Выполняется ли Change Detection немедленно?
// Да. detectChanges() выполняет проверку прямо в момент вызова.

// 3. Какие компоненты были проверены?
// Текущий компонент и всё его поддерево (дочерние компоненты). Родительские компоненты не проверяются.

// 4. В каких случаях использование detectChanges() предпочтительнее?
// Когда нужно обновить DOM прямо сейчас.
// После detach(), чтобы принудительно обновить состояние.
  
  detach(): void {
    this.cdr.detach();
  };
  
  changeCountClick(): void {
    this.count++;
    this.cdr.markForCheck();
  };
  
  changeCountSetTimeout() {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 100);
  };
  
  changeCountSetInterval(): void {
    setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  };
  
  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      this.cdr.markForCheck();
    });
  };
  
// 1. Обновляется ли интерфейс?
// Нет. После detach() компонент полностью исключается из цикла обнаружения изменений.
// Любые изменения this.count не приводят к обновлению DOM.

// 2. Выполняется ли ngDoCheck()?
// Нет. ngDoCheck вызывается только во время цикла CD. Если компонент отсоединён, цикл для него не выполняется.

// 3. Почему Angular перестал проверять компонент?
// detach() устанавливает внутренний флаг, который запрещает Angular включать этот компонент в дерево проверки.

// 4. Какие способы изменения значения больше не работают?
// Все: click, setTimeout, setInterval, Promise.

  reattach(): void {
    this.cdr.reattach();
  };
  
// 1. Что изменилось после reattach()?
// Компонент снова включён в дерево обнаружения изменений и будет проверяться при следующих циклах CD.

// 2. Когда компонент снова начал участвовать в Change Detection?
// Сразу после вызова reattach().

// 3. Нужно ли дополнительно вызывать detectChanges() или markForCheck()?
// Да, нужно, потому что мы используем стратегию OnPush, и без markForCheck() или detectChanges() не сработает

}
