import {ManageFileModule} from './manage-file.module';

describe('fileModule', () => {
    let fileModule:ManageFileModule;

    beforeEach(() => {
        fileModule = new ManageFileModule();
    });

    it('should create an instance', () => {
        expect(fileModule).toBeTruthy();
    });
});
