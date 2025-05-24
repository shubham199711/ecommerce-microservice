# 100 locks
# open
# 1st -> closed all
# opening every 2nd locker -> 2 , 4 (even locker)
# opening every 3nd locker -> flip state of every locker
# till 100

# answer -> state of locker
#

def main():
    # False means clocked and True means open
    locker = [False for _ in range(100)]
    for i in range(2, 101):
        for j in range(i - 1, len(locker), i):
            locker[j] = not locker[j]
    
    for i, lock in enumerate(locker):
        print(f"{i + 1} is {lock}")
        


 
if __name__ == "__main__":
    main()