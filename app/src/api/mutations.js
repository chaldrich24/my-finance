import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

export const ADD_COST = gql`
    mutation addCost($description: String!, $date: String!, $amount: Float!, $category: String!) {
        addCost(description: $description, date: $date, amount: $amount, category: $category) {
            costs {
                    description
                    date
                    amount
                    category
                }
            }
    }
`