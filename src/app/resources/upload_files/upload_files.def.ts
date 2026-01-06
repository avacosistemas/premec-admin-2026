import { UPLOAD_FILES_I18N_DEF } from './i18n/upload_files.i18n';
import { UPLOAD_FILES_NAV_DEF } from './navigation/upload_files.nav';
import { UPLOAD_FILES_SECURITY_DEF } from './security/upload_files.security';
import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { UploadFilesComponent } from './components/upload-files.component';

export const UPLOAD_FILES_DEF: PageComponentDef = {
    name: 'UPLOAD_FILES',
    i18n: UPLOAD_FILES_I18N_DEF,
    navigation: UPLOAD_FILES_NAV_DEF,
    security: UPLOAD_FILES_SECURITY_DEF,
    component: UploadFilesComponent,

    actions: [
        {
            actionNameKey: 'UPLOAD_FILES_ACTION_SUBIR',
            icon: 'heroicons_outline:cloud-arrow-up'
        }
    ]
};