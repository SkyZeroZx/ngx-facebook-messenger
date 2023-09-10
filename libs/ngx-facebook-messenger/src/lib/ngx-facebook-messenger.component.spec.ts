import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxFacebookMessengerComponent } from './ngx-facebook-messenger.component';

describe('NgxFacebookMessengerComponent', () => {
	let component: NgxFacebookMessengerComponent;
	let fixture: ComponentFixture<NgxFacebookMessengerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxFacebookMessengerComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NgxFacebookMessengerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
