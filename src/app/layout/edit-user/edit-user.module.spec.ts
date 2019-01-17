import {EditUserModule} from './edit-user.module';

describe('EditUserModule', () => {
    let editModule:EditUserModule;

    beforeEach(() => {
        editModule = new EditUserModule();
    });

    it('should create an instance', () => {
        expect(editModule).toBeTruthy();
    });
});
