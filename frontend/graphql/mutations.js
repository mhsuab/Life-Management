import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $todoExpiresDay: Int!
        $calendarExpiresDay: Int!
        $blockExpiresDay: Int!
        $notificationTime: Int!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $$confirmPassword
                todoExpiresDay: $todoExpiresDay
                calendarExpiresDay: $calendarExpiresDay
                blockExpiresDay: $blockExpiresDay
                notificationTime: $notificationTime
            }
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

export const UPDATE_NOTE = gql`
    mutation updateNote($msg: String!) {
        updateNote(msg: $msg)
    }
`;

export const ADD_BLOCK = gql`
    mutation addBlock(
        $name: String!
        $subject: String!
        $color: String!
        $onCalendar: String!
        $startTime: Int!
        $endTime: Int!
        $Day: String!
        $isReview: Boolean!
        $repeated: Int!
    ) {
        addBlock(
            blockInput: {
                name: $name
                subject: $subject
                color: $color
                onCalendar: $onCalendar
                startTime: $startTime
                endTime: $endTime
                Day: $Day
                isReview: $$isReview
                repeated: $repeated
            }
        ) {
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

export const DELETE_BLOCK = gql`
    mutation deleteBlock($blockID: ID!) {
        deleteBlock(
            blockID: $blockID
        ) {
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

export const UPDATE_BLOCK = gql`
    mutation addBlock(
        $blockID: ID!
        $name: String!
        $subject: String!
        $color: String!
        $onCalendar: String!
        $startTime: Int!
        $endTime: Int!
        $Day: String!
        $isReview: Boolean!
        $repeated: Int!
    ) {
        addBlock(
            blockInput: {
                name: $name
                subject: $subject
                color: $color
                onCalendar: $onCalendar
                startTime: $startTime
                endTime: $endTime
                Day: $Day
                isReview: $$isReview
                repeated: $repeated
            }
            blockID: $blockID
        ) {
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

export const ADD_TODO = gql`
    mutation addTodo(
        $name: String!
        $category: String!
        $subject: String!
        $color: String!
    ) {
        addTodo(
            todoInput: {
                name: $name
                category: $category
                subject: $subject
                color: $color
            }
        ) {
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

export const DELETE_TODO = gql`
    mutation deleteTodo(
        $todoID: ID!
    ) {
        deleteTodo(
            todoID: $todoID
        ) {
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

export const UPDATE_TODO = gql`
    mutation updateTodo(
        $todoID: ID!
        $name: String!
        $category: String!
        $subject: String!
        $color: String!
    ) {
        updateTodo(
            todoInput: {
                name: $name
                category: $category
                subject: $subject
                color: $color
            }
            todoID: $todoID
        ) {
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

export const ADD_EMPTY_BLOCK = gql`
    mutation addEmptyBlock(
        $subject: String!
        $color: String!
    ) {
        addEmptyBlock(
            emptyBlockInput: {
                subject: $subject
                color: $color
            }
        ) {
            id
            userID
            subject
            color
        }
    }
`;

export const DELETE_EMPTY_BLOCK = gql`
    mutation deleteEmptyBlock(
        $emptyBlockID: ID!
    ) {
        addEmptyBlock(
            emptyBlockID: $emptyBlockID
        ) {
            id
            userID
            subject
            color
        }
    }
`;

export const UPDATE_EMPTY_BLOCK = gql`
    mutation updateEmptyBlock(
        $emptyBlockID: ID!
        $subject: String!
        $color: String!
    ) {
        addEmptyBlock(
            emptyBlockInput: {
                subject: $subject
                color: $color
            }
            emptyBlockID: $emptyBlockID
        ) {
            id
            userID
            subject
            color
        }
    }
`;