import { gql } from '@apollo/client';

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