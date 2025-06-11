import mysql.connector

def get_cursor():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="curso"
    )

    return connection, connection.cursor(dictionary=True)


# def get_cursor():
#     conn = create_connection()
#     cursor = conn.cursor(dictionary=True)
#     return conn, cursor