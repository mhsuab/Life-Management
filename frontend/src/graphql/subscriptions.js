// import { gql } from '@apollo/client';
import gql from 'graphql-tag';


export const UPDATE_CALENDAR = gql`
    subscription {
        updateCalendar {
            type
            info {
                Day
                ifExist
            }
        }
    }
`;