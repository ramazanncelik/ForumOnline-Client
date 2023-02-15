import { object, string,ref } from 'yup';
import { language } from './utils';


export const registerValidations = object({

    email: string()
        .required(language.includes("tr") ?
            'E-mail Adresi Boş Geçilemez'
            :
            'E-mail Adress Cannot be blank')
        .email(language.includes("tr") ?
            'Geçerli bir e-mail adresi giriniz!'
            :
            'Please enter a valid e-mail address!'),
    nickName: string()
        .required(language.includes("tr") ?
            'Kullanıcı Adı Boş Geçilemez!'
            :
            'Nick Name Cannot be blank!')
        .min(1, ({ min }) => language.includes("tr") ?
            'Kullanıcı Adı en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Nick Name must be at least' + min + 'characters!')
        .max(50, ({ max }) => language.includes("tr") ?
            'Kullanıcı Adı en fazla ' + max + ' karakterden oluşmalıdır!'
            :
            'Username must be a maximum of ' + max + ' characters!'),
    password: string()
        .required(language.includes("tr") ?
            'Şifre Boş Geçilemez!'
            :
            'Password Cannot be blank!')
        .min(6, ({ min }) => language.includes("tr") ?
            'Şifre en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Password must be at least' + min + 'characters!'),
});

export const loginValidations = object({

    email: string()
        .required(language.includes("tr") ?
            'E-mail Adresi Boş Geçilemez'
            :
            'E-mail Adress Cannot be blank')
        .email(language.includes("tr") ?
            'Geçerli bir e-mail adresi giriniz!'
            :
            'Please enter a valid e-mail address!'),
    password: string()
        .required(language.includes("tr") ?
            'Şifre Boş Geçilemez!'
            :
            'Password Cannot be blank!')
        .min(6, ({ min }) => language.includes("tr") ?
            'Şifre en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Password must be at least' + min + 'characters!'),
});

export const getEmailValidations = object({

    email: string()
        .required(language.includes("tr") ?
            'E-mail Adresi Boş Geçilemez'
            :
            'E-mail Adress Cannot be blank')
        .email(language.includes("tr") ?
            'Geçerli bir e-mail adresi giriniz!'
            :
            'Please enter a valid e-mail address!'),
    
});

export const resetPasswordValidations = object({

    password: string()
        .required(language.includes("tr") ?
            'Şifre Boş Geçilemez!'
            :
            'Password Cannot be blank!')
        .min(6, ({ min }) => language.includes("tr") ?
            'Şifre en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Password must be at least' + min + 'characters!'),
    passwordConfirm: string()
        .oneOf([ref("password")])
        .required(language.includes("tr") ?
            'Boş Geçilemez!'
            :
            'Cannot be blank!'),
});

export const publishPostValidations = object({

    subject: string()
        .required(language.includes("tr") ?
            'Konu Boş Geçilemez!'
            :
            'Subject Cannot be blank!')
        .min(2, ({ min }) => language.includes("tr") ? "Lütfen Bir Konu Seçiniz..." : "Please Select a Subject..."),
    title: string()
        .required(language.includes("tr") ?
            'Başlık Boş Geçilemez!'
            :
            'Title Cannot be blank!')
        .min(1, ({ min }) => language.includes("tr") ?
            'Başlık en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Title must be at least' + min + 'characters!')
        .max(150, ({ max }) => language.includes("tr") ?
            'Başlık en fazla ' + max + ' karakterden oluşmalıdır!'
            :
            'Title must be a maximum of ' + max + ' characters!'),
    text: string()
        .required(language.includes("tr") ?
            'Metin Boş Geçilemez!'
            :
            'Text Cannot be blank!')
        .min(1, ({ min }) => language.includes("tr") ?
            'Metin en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Text must be at least' + min + 'characters!')
        .max(2500, ({ max }) => language.includes("tr") ?
            'Metin en fazla ' + max + ' karakterden oluşmalıdır!'
            :
            'Text must be a maximum of ' + max + ' characters!'),

});

export const reportValidations = object({

    title: string()
        .required(language.includes("tr") ?
            'Başlık Boş Geçilemez!'
            :
            'Title Cannot be blank!')
        .min(2, ({ min }) => language.includes("tr") ? "Lütfen Bir Başlık Seçiniz..." : "Please Select a Title..."),
    detail: string()
        .required(language.includes("tr") ?
            'Detay Boş Geçilemez!'
            :
            'Detail Cannot be blank!')
        .min(1, ({ min }) => language.includes("tr") ?
            'Detay en az ' + min + ' karakterden oluşmalıdır!'
            :
            'Detail must be at least' + min + 'characters!')
        .max(2000, ({ max }) => language.includes("tr") ?
            'Detay en fazla ' + max + ' karakterden oluşmalıdır!'
            :
            'Detail must be a maximum of ' + max + ' characters!'),

});