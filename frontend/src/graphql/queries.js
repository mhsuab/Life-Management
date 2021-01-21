// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';

export const GET_NOTE = gql`
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
            deadLine
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

export const GET_WEEK_BLOCKS = gql`
    query getWeek($date: String!) {
        getWeek(date: $date) {
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

export const GET_MONTH_CALENDAR = gql`
    query getMonth($month: String!) {
        getMonth(month: $month)
    }
`;