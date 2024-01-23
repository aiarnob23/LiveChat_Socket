import PropTypes from 'prop-types';
const Users = ({singleUser}) => {
    const {name, UserEmail, _id} = singleUser;
    return (
        <div>
            {name}<br/>
            {_id}<br/>
            {UserEmail}
            <br/><br/>
        </div>
    );
};

export default Users;

Users.propTypes={
    singleUser:PropTypes.object,
}