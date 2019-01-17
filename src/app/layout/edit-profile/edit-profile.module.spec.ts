import {EditProfileModule} from './edit-profile.module';

describe('EditProfileModule', () => {
    let profileModule:EditProfileModule;

    beforeEach(() => {
        profileModule = new EditProfileModule();
    });

    it('should create an instance', () => {
        expect(profileModule).toBeTruthy();
    });
});
