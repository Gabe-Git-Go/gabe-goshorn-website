import { getHttpClient } from '../../shared/config/httpClient';


export const sendEmail = async (emailDetails) => {
    return await getHttpClient().post('/hire-me/email/send', emailDetails,
        {
            validateStatus: (status) => {
                return status < 500
            }
        }
    )
}