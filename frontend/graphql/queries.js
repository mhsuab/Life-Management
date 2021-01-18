import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
    query login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            username
            pwdHash
            todoExpiresDay
            calendarExpiresDay
            notificationTime
            blockExpiresDay
            token
        }
    }
`;

export const GET_NOTES = gql`
    query getNote {
        getNote
    }
`;

export const GET_CALENDAR = gql`
    query getCalendar($date: String!) {
        getCalendar(date: $date)
    }
`

export const GET_ONE_DAY = gql`
    query getOneDay($date: String!) {
        getOneDay(date: $date) {
            id
            userID
            name
            subject
            color
            onCalendar
            startTime
            endTime
            Day
            isReview
            repeated
            expiredAfter
            blockExpiresDay
        }
    }
`;

export const GET_TODOS = gql`
    query getTodo {
        getTodo {
            id
            userID
            name
            category
            expiredAfter
            subject
            color
            completedDay
        }
    }
`;

export const GET_EMPTY_BLOCKS = gql`
    query getEmptyBlock {
        getEmptyBlock {
            id
            userID
            subject
            color
        }
    }
`;