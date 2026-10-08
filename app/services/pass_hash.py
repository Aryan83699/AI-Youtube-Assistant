from passlib.context import CryptContext

pswd_context=CryptContext(schemes=['bcrypt'],deprecated="auto")



def hash_password(password:str) -> str:
    return pswd_context.hash(password)


def check_password(plain_pswd:str,hash_pswd:str) -> str:
    return pswd_context.verify(plain_pswd,hash_pswd)


print(check_password("aryan",hash_password("aryan")))