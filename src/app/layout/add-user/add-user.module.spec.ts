import {AddUserModule} from './add-user.module';

describe('AddUserModule', () => {
    let addModule:AddUserModule;

    beforeEach(() => {
        addModule = new AddUserModule();
    });

    it('should create an instance', () => {
        expect(addModule).toBeTruthy();
    });
});
