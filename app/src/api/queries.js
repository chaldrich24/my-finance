import { gql } from '@apollo/client';

export const ME = gql`
    query me {
        me {
            _id
            email
            costs {
                _id
                description
                amount
                category
                date
            }
        }
    }
`