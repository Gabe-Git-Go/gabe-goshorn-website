import { getHttpClient } from '../../shared/config/httpClient';


export const sendEmail = async (emailDetails) => {
    console.log(process.env.BE_API_BASE_URL)
    return await getHttpClient().post('/hire-me/email/send', emailDetails,
        {
            validateStatus: (status) => {
                return status < 400
            }
        }
    )
}