import { UserModel } from "../types/userModel";
import { UserRequest } from "../types/userRequest"

function getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}

export const dummyData: UserRequest[] = [
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    },
    {
        requestId: 101,
        requestDate: getCurrentDate(),
        requestTitle: `Lorem ipsum dolor`,
        requestStatus: 'approved'
    },
    {
        requestId: 102,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'pending'
    },
    {
        requestId: 103,
        requestTitle: `Lorem ipsum dolor`,
        requestDate: getCurrentDate(),
        requestStatus: 'rejected'
    }
]

export const dummyUsers: UserModel[] = [
    {
        userId: 1010,
        firstName: 'Michael',
        lastName: 'De Santa',
        email: 'Michael@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        isAllowed: "restricted",
        roleId: -1
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'De Santa',
        email: 'Michael@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        isAllowed: "restricted",
        roleId: -1
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'De Santa',
        email: 'Michael@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        isAllowed: "restricted",
        roleId: -1
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'De Santa',
        email: 'Michael@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        isAllowed: "restricted",
        roleId: -1
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 101,
        firstName: 'Michael',
        lastName: 'De Santa',
        email: 'Michael@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    },
    {
        userId: 102,
        firstName: 'Franklin',
        lastName: 'Clinton',
        email: 'Franklin@gmail.com',
        isAllowed: "restricted",
        roleId: -1
    },
    {
        userId: 103,
        firstName: 'Trevor',
        lastName: 'Philips',
        email: 'Trevor@gmail.com',
        isAllowed: "allowed",
        roleId: -1
    }
]