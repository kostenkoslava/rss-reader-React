import * as yup from 'yup';

yup.setLocale({
    string: {
        url: 'this must be a valid url',
    },
    mixed: {
        notOneOf: 'this url is already in the list of feeds',
    },
});

const validate = (url, list) => yup.string().url().notOneOf(list).validate(url);

export async function validateLink(url, existedLinks) {
   const result = await validate(url, existedLinks).then((e) => {
        return { valid: true }
    }).catch((er) => {
        return { valid: false, error: er.message }
    })
    return result;
}