import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';


export class Notification {
    id: string;
    type: NotificationType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?:Partial<Notification>) {
        Object.assign(this, init);
    }
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private subject = new Subject<Notification>();
    private _appBusySubject: Subject<boolean> = new Subject<boolean>();
    private defaultId = 'default-alert';


    onAlert(id = this.defaultId): Observable<Notification> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    public AppBusyTracker(): Observable<boolean> {
        return this._appBusySubject.asObservable();
    }

    success(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Warning, message }));
    }

    alert(alert: Notification) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    clear(id = this.defaultId) {
        this.subject.next(new Notification({ id }));
    }

    public ShowLoading(message: string = "") {
        this._appBusySubject.next(true);
    }

    public HideLoading(): void {
        this._appBusySubject.next(false);
    }
}