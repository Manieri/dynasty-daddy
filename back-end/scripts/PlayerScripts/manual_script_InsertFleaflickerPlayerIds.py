import csv
import PlayerService
import psycopg2
from Constants import DDPlayerPosMap

def fetchFromFleaFlickerCsv():
    with open('C:\\Users\\Jeremy\\Desktop\\People.csv', 'r') as file:
        csvreader = csv.reader(file)

        # Connect to local test database
        conn = psycopg2.connect(
            database="dynasty_daddy", user='postgres', password='postgres', host='localhost', port='5432'
        )

        # Setting auto commit false
        conn.autocommit = True

        # Creating a cursor object using the cursor() method
        cursor = conn.cursor()
        iter = 0
        for row in csvreader:
            pos = row[4]
            if pos in DDPlayerPosMap:
                pos = DDPlayerPosMap[pos]
            playerId = PlayerService.cleanPlayerIdString(row[3] + pos)
            fleaflicker_id = row[2]
            playerIdsStatement = ''' UPDATE player_ids
                        SET
                        ff_id = %s,
                        updated_at = now() where name_id = %s'''
            cursor.execute(playerIdsStatement, (fleaflicker_id, playerId))
            print('(' + str(iter) + ') ' + playerId + ' processed ')
            iter = iter + 1
        
        # update the materialized view for the player ids   
        cursor.execute('''REFRESH MATERIALIZED VIEW CONCURRENTLY mat_vw_players;''')
        conn.commit()

fetchFromFleaFlickerCsv()
