import {ManageUserModule} from './manage-user.module';

describe('ManageUserModule', () => {
    let manageModule:ManageUserModule;

    beforeEach(() => {
        manageModule = new ManageUserModule();
    });

    it('should create an instance', () => {
        expect(manageModule).toBeTruthy();
    });
});
