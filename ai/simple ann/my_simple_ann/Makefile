include ./settings

compile:
	g++ -c $(LIB_SOURCE)*.cpp

archive: *.o
	ar rcs $(LIB_FILE_NAME) *.o
	chmod +x $(LIB_FILE_NAME)

clean: *.o
	rm *.o

move: *.a
	mv $(LIB_FILE_NAME) $(SYSTEM_LIB_DIR)
	mkdir $(SYSTEM_HEADERS_DIR)$(LIB_DIR_NAME)
	cp -r $(LIB_SOURCE)*.h $(SYSTEM_HEADERS_DIR)$(LIB_DIR_NAME)

install:
	$(MAKE) compile
	$(MAKE) archive
	$(MAKE) move
	$(MAKE) clean
