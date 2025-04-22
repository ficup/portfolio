FROM python:slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY source app
CMD ["flask", "run", "--host=0.0.0.0"]

EXPOSE 5000
