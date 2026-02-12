import { getApiToken, url } from "./fetchUrl"

export const getSubjectsDetailsList = async (onSuccess = () => { }) => {
    try {
        const response = await fetch(`${url}/io/subjects`, {
            headers: {
                'Api-Token': await getApiToken()
            }
        });
        if (response.status === 200) {
            let listArray = [];
            try {
                listArray = await response.json();
            } catch {
                console.error("Subjects data is invalid:", await response.text());
            }
            onSuccess(listArray);
            return listArray;
        } else {
            console.error("Error fetching subjects details:", await response.text());
            return [];
        }
    } catch (error) {
        console.error("Unable to fetch subjects data");
        throw error;
    }
}

export const saveSubject = async (
    subjectName,
    subjectDetails,
    onSuccess = () => { },
    onFailed = () => { }
) => {
    try {
        const response = await fetch(`${url}/io/subjects/${subjectName}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'Api-Token': await getApiToken()
            },
            body: JSON.stringify(subjectDetails)
        });
        if (response.status === 200) {
            onSuccess();
            return subjectName;
        } else {
            const textResponse = await response.text();
            console.error("Error saving subject details:", textResponse);
            onFailed(textResponse);
            return null;
        }
    } catch (error) {
        console.error("Invalid subject data or unable to send request:", subjectDetails);
        throw error;
    }
}
